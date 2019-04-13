# T-Shirt-Designer

Front end code for a t shirt designer UI built for kastlfel.com

Built in pure javascript and deployed to a wordpress website
## Backend Documentation
### Resources
#### Styles
```
style: {
  "uuid": uuid,
  "style_id": number,
  "name": string,
  "brand": string,
  "description": string
}
```
##### Endpoints
`api/styles`: Lists all styles  
`api/styles/<uuid>`: Detail for single style lookup by uuid


#### StyleColor
```
StyleColor: {
  "color": string,
  "hex": string (hexadecimal, 6 characters)
}
```
##### Endpoints
`api/styles/<uuid>/colors`: Gets all colors for that specific style

#### Ink Color
```
  InkColor: {
    "color": string,
    "hex": string (hexadecimal, 6 characters)
  }
```

##### Endpoints
`api/inks`: Gets all ink colors for different designs
