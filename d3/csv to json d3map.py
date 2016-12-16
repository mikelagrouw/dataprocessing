import csv
import json

json_file = open("land.json", "w")
dict = {}
i = 0

with open("density.csv", "r") as csvfile:
    dense = csv.reader(csvfile)
    print dense
    for row in dense:
        dict["land"] =  row[1]
        dict["density"] = row[5]
        dict["population"] = row[4]
        dict["area"] = row[2]
        print dict
        json.dump(dict, json_file)
    print json
    #json.file =

