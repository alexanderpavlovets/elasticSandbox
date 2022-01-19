# Sandbox for elasticsearch 
Inspired by article: https://betterprogramming.pub/introduction-to-elasticsearch-using-node-js-part-2-4c804427bc94

### How to use: 
- install elastic: https://www.elastic.co/guide/en/elasticsearch/reference/7.16/brew.html
- install kibana: https://www.elastic.co/guide/en/kibana/7.16/brew.html
- run both of them, elastic first. just by "elasticsearch" and "kibana" from terminal 
- open Kibana on default port http://localhost:5601 
- go to developer console 
- create an index: 
```
PUT shakespeare
{
  "settings": {
    "analysis": {
      "filter": {
        "autocomplete_filter": {
          "type": "edge_ngram",
          "min_gram": "1",
          "max_gram": "40"
        }
      },
      "analyzer": {
        "pk_custom_analyzer": {
          "type":      "custom", 
          "tokenizer": "standard",
          "char_filter": [
            "html_strip"
          ],
          "filter": [
            "lowercase"
          ]
        },
        "autocomplete": {
          "filter": ["lowercase", "autocomplete_filter"],
          "type": "custom",
          "tokenizer": "whitespace"
        }
      }
    }
  },
  "mappings": {
    "properties": {
      "speaker": {
        "type": "keyword"
      },
      "play_name": {
        "type": "text",
        "analyzer": "pk_custom_analyzer"
      },
      "line_id": {
        "type": "integer"
      },
      "speech_number": {
        "type": "integer"
      },
      "line_number": {
        "type": "keyword"
      },
      "text_entry": {
        "type": "text",
        "analyzer": "autocomplete"
      }
    }
  }
}
```

- dchek that data is added, and you can search it - Kibana console:
```
GET /shakespeare/_search
{
  "query" : {
    "match":{
      "text_entry" : "Where"
    }
  }
}
```

- put data into the index. data stored here in shakespeare_lines.json
```
curl -H 'Content-Type: application/x-ndjson' -XPOST 'localhost:9200/shakespeare/_bulk?pretty' --data-binary @shakespeare_lines.json
```

- run the server 
- make GET (change phrase if needed)
```
http://localhost:5000/lines?q=phrase
```
- be happy with the speed of responses! :)
