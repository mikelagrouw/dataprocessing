#!/usr/bin/env python
# Name:
# Student number:
'''
This script scrapes IMDB and outputs a CSV file with highest rated tv series.
'''
import csv

from pattern.web import URL, DOM, plaintext

TARGET_URL = "http://www.imdb.com/search/title?num_votes=5000,&sort=user_rating,desc&start=1&title_type=tv_series"
BACKUP_HTML = 'tvseries.html'
OUTPUT_CSV = 'tvseries.csv'

Title = []
Genre = []
Runtime =[]
Actors = []
Rating = []
stars = []



def extract_tvseries(dom):
    '''
    Extract a list of highest rated TV series from DOM (of IMDB page).

    Each TV series entry should contain the following fields:
    - TV Title
    - Rating
    - Genres (comma separated if more than one)
    - Actors/actresses (comma separated if more than one)
    - Runtime (only a number!)
    '''

    # ADD YOUR CODE HERE TO EXTRACT THE ABOVE INFORMATION ABOUT THE
    # HIGHEST RATED TV-SERIES
    # NOTE: FOR THIS EXERCISE YOU ARE ALLOWED (BUT NOT REQUIRED) TO IGNORE
    # UNICODE CHARACTERS AND SIMPLY LEAVE THEM OUT OF THE OUTPUT.
    # SCRAPE NAME OF TV SERIES

    for x in dom("div.lister-item-content"):
        for y in x.by_class("lister-item-header"):
            for z in y.by_tag("a"):
                Title.append(plaintext(z.content).encode('ascii', 'ignore'))
        # SCRAPE RUNTIME OF SERIES
        for y in x.by_class("runtime"):
            Runtime.append(plaintext(y.content).encode('ascii', 'ignore'))
        # SCRAPE GENRE OF SERIES
        for y in x.by_class("genre"):
            Genre.append(plaintext(y.content).encode('ascii', 'ignore'))
        # SCRAPE RATINGS OF SERIES
        for y in x.by_class("ratings-bar"):
            for z in y.by_class("inline-block ratings-imdb-rating"):
                Rating.append(plaintext(z.content).encode('ascii', 'ignore'))
        # SCRAPE ACTORS IN SERIES
        for y in x.by_tag("p"):
                for z in y.by_tag("a")[:4]:
                    Actors.append(plaintext(z.content).encode('ascii', 'ignore'))





    return [Title, Runtime, Genre, Actors, Rating]  # replace this line as well as appropriate


def save_csv(f, tvseries):
    '''
    Output a CSV file containing highest rated TV-series.
    '''
    writer = csv.writer(f)
    writer.writerow(['Title', 'Rating', 'Genre', 'Actors', 'Runtime'])

    for x in range(50):
        writer.writerow([Title[x],Rating[x], Genre[x], Actors[x * 4: (x * 4) + 4], Runtime[x]])

if __name__ == '__main__':
    # Download the HTML file
    url = URL(TARGET_URL)
    html = url.download()

    # Save a copy to disk in the current directory, this serves as an backup
    # of the original HTML, will be used in grading.
    with open(BACKUP_HTML, 'wb') as f:
        f.write(html)

    # Parse the HTML file into a DOM representation
    dom = DOM(html)

    # Extract the tv series (using the function you implemented)
    tvseries = extract_tvseries(dom)

    # Write the CSV file to disk (including a header)
    with open(OUTPUT_CSV, 'wb') as output_file:
        save_csv(output_file, tvseries)