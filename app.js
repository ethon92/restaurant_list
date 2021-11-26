'use strict'
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
  res.render('index', { restaurantList: restaurantList.results})
})

// 設定個別餐廳詳細資訊
app.get('/restaurants/:id', (req, res) => {
  const clickedRestaurantId = req.params.id
  const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === clickedRestaurantId)
  res.render('show', { restaurant: restaurant })
})

// 設定搜尋路由
app.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim().toLowerCase() // 利用trim將空白剔除以及將字母轉換為小寫
  const results = restaurantList.results.filter( restaurant => {
    return searchKeyword(restaurant.name, keyword) || searchKeyword(restaurant.category, keyword)
  })
  res.render('index', { restaurantList: results, keyword: keyword})
})

// 利用listen將網頁呈現在htttp://localhost:3000
app.listen( port, () => {
  console.log(`restaurant_list is running on http://localhost: ${port}`)
})

// 宣告搜尋關鍵字函式
function searchKeyword(isSearchedItem, keyword){
  return isSearchedItem.toLowerCase().includes(keyword)
}