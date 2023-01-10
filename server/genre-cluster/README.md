This folder contains the code for our machine learning models and algorithms that are used to cluster movies or other media by genre. It is written in Python, and makes use of various libraries and tools for data analysis and machine learning.

Movies are categorized by broad genres (action, drama, mystery), but if we are sorting our own library, we really care about more fine-grained categorization relative to the other movies in the library. For example, if my library contains rom-coms and horror movies, then naive genre tagging will do a good enough job of separating titles; however, if my library contains many horror movies, then I need more better subgenre classification like Creature Features and Paranormal Hauntings. Here is my work to create this relative genre tagging from scratch using some data collected from public APIs, NLP, and some AI magic.
___

### First, collecting data from the TMDB.

```python
# get movie details, we only need the overview, genres, release year, and director
movie_details = []
for movie in movie_ids[:]:
    
    details = tmdb.Movies(movie).info()
    
    # get genres, join them into a string
    genres = " ".join([genre['name'] for genre in details['genres']])

    # get synopsis, do some preprocessing
    overview = details['overview']
    overview = overview.lower()
    # use regex to remove all non-alphanumeric characters
    overview = re.sub(r'[^a-zA-Z0-9\s]', '', overview)

    # get release year
    release_year = int(details['release_date'].split("-")[0])
    
    # get director
    director = find_director(movie)

    # go to imbd for more information
    imdb_id = details['imdb_id']

    # append to movie_details
    movie_details.append({
        'id' : movie,
        'title': details['title'],
        'overview': overview,
        'genres': genres,
        'release_year': release_year,
        'director': director
    })

# convert to pandas dataframe
pandas_movie_details = pd.DataFrame(movie_details)
```

### Second, cleaning text using stemming

```python

stemmer = PorterStemmer()

def stem_column(df, column_name):
    # tokenize the text
    df[column_name] = df[column_name].apply(lambda x: word_tokenize(x))
    # remove stop words
    df[column_name] = df[column_name].apply(lambda x: [word for word in x if word not in stopwords.words('english')])
    # stem the words
    df[column_name] = df[column_name].apply(lambda x: [stemmer.stem(word) for word in x])
    # join the words back into a string
    df[column_name] = df[column_name].apply(lambda x: " ".join(x))
    
stem_column(pandas_movie_details, 'overview')
stem_column(pandas_movie_details, 'genres')

```
### Third, token vectorization and feature reduction

```python
# prepare the dataframe for clustering
df = pandas_movie_details.drop(columns=['id', 'title'])

# create a tfidf vectorizer
tfid_vectorizer = TfidfVectorizer(stop_words='english', ngram_range=(1,2))
# vectorize overview
overview_vectors = tfid_vectorizer.fit_transform(df['overview'])

# reduce dimensionality using PCA
num_components = 100
svd = TruncatedSVD(n_components=num_components, n_iter=10)
overview_vectors = svd.fit_transform(overview_vectors)

# vectorize director
# write a token pattern that grabs the full name of the director (may contain periods)
director_vectorizer = TfidfVectorizer(stop_words='english', strip_accents='ascii', token_pattern=r'[a-zA-Z.\s]+')
director_vectors = director_vectorizer.fit_transform(df['director'])

count_vectorizer = CountVectorizer(stop_words='english')
# vectorize genres
genre_vectors = count_vectorizer.fit_transform(df['genres'])

# combine all features 
combined_vectors = np.concatenate((overview_vectors, director_vectors.toarray(), genre_vectors.toarray()), axis=1)
# put into a dataframe
df_vectors = pd.DataFrame(combined_vectors)

# print the top 10 features after dimensionality reduction
top_c = svd.components_.argsort()[:, -num_components:]
print("Top synopsis features:")
print([tfid_vectorizer.get_feature_names_out()[i] for i in top_c[0]])

```

    Top synopsis features:
    ['lurk', 'fall love', 'claim', 'patriarch', 'famili patriarch', 'make', 'corleon', 'crime famili', 'unravel', 'way', 'youngest daughter', 'attack youngest', 'home invad', 'apparit', 'suburban', 'terrifi apparit', 'escal attack', 'famili come', 'spirit terrifi', 'suburban home', 'famili suburban', 'togeth rescu', 'invad angri', 'come togeth', 'angri spirit', 'apparit escal', 'investig', 'attack', 'strang', 'rescu', 'fatal', 'monster', 'jay', 'hit', 'woman', 'escal', 'sleep', 'supernatur', 'pass', 'fear', 'confront', 'old', 'angri', 'stori', 'terror', 'secret', 'togeth', 'attempt', 'reach', 'desper', 'ellison', 'singl', 'singl mother', 'power', 'best', 'thing', 'ed', 'lorrain', 'man', 'youngest', 'world', 'crime', 'love', 'begin', 'becom', 'increasingli', 'film', 'person', 'death', 'forc', 'mother', 'new', 'daughter famili', 'mysteri', 'invad', 'fall', 'friend', 'dark', 'killer', 'hous', 'discov', 'work', 'children', 'learn', 'plagu', 'come', 'warren', 'young', 'presenc', 'victim', 'spirit', 'terrifi', 'year', 'live', 'life', 'son', 'daughter', 'help', 'home', 'famili']

### Fourth, hyperparameter optimization

```python

# Compute the silhouette score for different values of n_clusters
scores = []
kmeans_models = {}
for n_clusters in range(4,9):
    kmeans = KMeans(n_clusters=n_clusters, n_init=10)
    clusters = kmeans.fit_predict(df_vectors)
    score = silhouette_score(df_vectors, clusters)
    scores.append(score)
    kmeans_models[score] = kmeans

# Plot the silhouette scores
plt.plot(range(4, 9), scores)
plt.xlabel('Number of clusters')
plt.ylabel('Silhouette score')
plt.show()

# save n_clusters that maximizes the silhouette score
best_score = max(scores)
best_model = kmeans_models[best_score]

# add the labels, to the original dataframe
pandas_movie_details['cluster'] = best_model.labels_

# print each cluster and the movies in it
for cluster in pandas_movie_details['cluster'].unique():
    print("Cluster: ", cluster)
    titles = pandas_movie_details[pandas_movie_details['cluster'] == cluster]['title']
    ids = pandas_movie_details[pandas_movie_details['cluster'] == cluster]['id']
    for title, id in zip(titles, ids):
        print(title, " - ", id)
    print()
```
    
![image](https://user-images.githubusercontent.com/47376937/211188689-acf0c582-b24a-4241-933f-16cd6e8667a7.png)
    

### Finally, print out the categorized movies.
The results are not perfect, but can be improved if we do some more data scraping, e.g. use plot synopsis from IMDB and wikipedia. Second, we can give the clusters our custom names by passing the list to openai GPT-3. Our future work will be integrating this into the rest of the app. Categorization will be done on a user's list, with the abiity to manually override the placement of a movie or the name of a subgenre.

    Cluster:  0
    Inside Out  -  150540
    Finding Nemo  -  12
    Monsters, Inc.  -  585
    The Jungle Book  -  9325
    Toy Story  -  862
    The Lion King  -  8587
    
    Cluster:  1
    Saw  -  176
    The Exorcist  -  9552
    The Blair Witch Project  -  2667
    The Conjuring 2  -  259693
    Get Out  -  419430
    The Ring  -  565
    Poltergeist  -  243688
    The Omen  -  806
    The Shining  -  694
    Sinister  -  82507
    The Grudge  -  1970
    The Orphanage  -  403214
    The Birds  -  571
    The Babadook  -  242224
    Halloween Ends  -  616820
    Insidious  -  49018
    The Witch  -  310131
    The Amityville Horror  -  10065
    Hereditary  -  493922
    Die Hard  -  562
    A Nightmare on Elm Street  -  377
    The Conjuring  -  138843
    The Texas Chainsaw Massacre  -  9373
    It Follows  -  270303
    
    Cluster:  2
    The Prestige  -  1124
    A Clockwork Orange  -  185
    The Hunger Games: Mockingjay - Part 1  -  131631
    Annihilation  -  300668
    Bird Box  -  405774
    
    Cluster:  3
    The Shape of Water  -  399055
    The Hangover  -  18785
    The Fault in Our Stars  -  222935
    Birdman or (The Unexpected Virtue of Ignorance)  -  194662
    My Big Fat Greek Wedding  -  8346
    The Notebook  -  11036
    The Proposal  -  18240
    Mama Mia - Nur keine Panik  -  4659
    
    Cluster:  4
    The Godfather  -  238
    The Usual Suspects  -  629
    Ocean's Eleven  -  161
    American Psycho  -  1359
    The Dark Knight Rises  -  49026
    A Simple Favor  -  484247
    The Sixth Sense  -  745
    The Departed  -  1422
    The Shawshank Redemption  -  278
    The Silence of the Lambs  -  274
    
    Cluster:  5
    The Lord of the Rings: The Fellowship of the Ring  -  120
    Iron Man 2  -  10138
    The Avengers  -  24428
    The Matrix Resurrections  -  624860
