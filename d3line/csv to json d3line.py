import csv
import json

json_file = open("file.json", "w")
dict = {}
i = 0

with open("KNMI.csv", "r") as csvfile:
    dense = csv.reader(csvfile)
    print dense
    for row in dense:
        print row
        rij =  row
        dict["station"] = row[0]
        dict["date"] = row[1]
        dict["hoogste windstoot"] = row[2]
        dict["neeslag"] = row[3]
        dict["bewolking"] = row[4]
        json.dump(dict, json_file)
    print json
    #json.file =

