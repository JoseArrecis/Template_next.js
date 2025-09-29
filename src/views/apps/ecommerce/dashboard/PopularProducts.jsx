'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

// Components Imports
import OptionMenu from '@core/components/option-menu'

// Componente principal
const PopularProducts = () => {
  const [products, setProducts] = useState([
    { title: 'Apple iPhone 13', subtitle: '4567', amount: '$999.29', price: 999.29, imgSrc: '/images/cards/apple-iPhone-13.png' },
    { title: 'Nike Air Jordan', subtitle: '3456', amount: '$72.40', price: 72.4, imgSrc: '/images/cards/nike-air-jordan.png' },
    { title: 'Beats Studio 2', subtitle: '9485', amount: '$99.90', price: 99.9, imgSrc: '/images/cards/beats-studio-2.png' },
    { title: 'Apple Watch Series 7', subtitle: '2345', amount: '$249.99', price: 249.99, imgSrc: '/images/cards/apple-watch-series-7.png' },
    { title: 'Amazon Echo Dot', subtitle: '8959', amount: '$79.40', price: 79.4, imgSrc: '/images/cards/amazon-echo-dot.png' },
    { title: 'PlayStation Console', subtitle: '7892', amount: '$129.48', price: 129.48, imgSrc: '/images/cards/play-station-console.png' }
  ])

  // Ordenar productos
  const handleSort = (type) => {
    let sorted = [...products]
    if (type === 'lowToHigh') {
      sorted.sort((a, b) => a.price - b.price)
    } else if (type === 'highToLow') {
      sorted.sort((a, b) => b.price - a.price)
    }
    setProducts(sorted)
  }

  // Agregar producto nuevo
  const handleAdd = () => {
    const newProduct = {
      title: 'New Product',
      subtitle: Math.floor(Math.random() * 9000 + 1000).toString(),
      amount: '$50.00',
      price: 50.0,
      imgSrc: '/images/cards/apple-iPhone-13.png'
    }
    setProducts((prev) => [newProduct, ...prev])
  }

  return (
    <Card>
      <CardHeader
        title='Popular Products'
        subheader={`Total ${products.length} Products`}
        action={
          <OptionMenu
            options={[
              { text: 'Add', menuItemProps: { onClick: handleAdd } },
              { text: 'Price - low to high', menuItemProps: { onClick: () => handleSort('lowToHigh') } },
              { text: 'Price - high to low', menuItemProps: { onClick: () => handleSort('highToLow') } },
            ]}
          />
        }
      />
      <CardContent className='flex flex-col gap-[1.638rem]'>
        {products.map((item, index) => (
          <div key={index} className='flex items-center gap-4'>
            <img src={item.imgSrc} alt={item.title} width={46} />
            <div className='flex flex-wrap justify-between items-center gap-x-4 gap-y-1 is-full'>
              <div className='flex flex-col'>
                <Typography className='font-medium' color='text.primary'>
                  {item.title}
                </Typography>
                <Typography variant='body2'>{`Item: #FXZ-${item.subtitle}`}</Typography>
              </div>
              <Typography>{item.amount}</Typography>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

export default PopularProducts
