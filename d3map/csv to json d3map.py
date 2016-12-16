import csv
import json

json_file = open("file.json", "w")
dict = {}
i = 0

with open("csv density.csv", "r") as csvfile:
    dense = csv.reader(csvfile)
    print dense
    for row in dense:
        dict["land"] =  row[1]
        dict["density"] = row[6]
        print dict
        json = json.dumps(dict)
    print json
    #json.file =

