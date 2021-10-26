# weather-api

## API Endpoints
`POST /api/weather/`

Description: Retrieve information about current weather by zipcode. 

```
Request Body: {
  zipcode: String
}
```

`POST /api/weather/list`

Description: Retrieve information about weather forecast in future days by zipcode and number of days. (Max of 3 days due to free tier API limit) 

```
Request Body: {
  zipcode: String,
  days: Int
}
```
