// 引入express/handlebars/reataurant
const express = require('express')
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')

// 宣告變數app並放入express
const app = express()

// 設定port為3000
const port = 3000

// 設定handlebars的樣板引擎並將express的view engine設為handlebars
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// 設定static file
app.use(express.static('public'))

// 設定首頁的路由並顯示餐廳清單
app.get('/', (req, res) => {
  // console.log(restaurantList.results)
  res.render('homePage', { restaurantList: restaurantList.results})
})

app.get('/restaurants/:id', (req, res) => {
  console.log(req.params.id)
  const clickedRestaurantId = req.params.id
  const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === clickedRestaurantId)
  res.render('showPage', { restaurant: restaurant })
})

// 利用listen將網頁呈現在htttp://localhost:3000
app.listen( port, () => {
  console.log(`restaurant_list is running on http://localhost: ${port}`)
})