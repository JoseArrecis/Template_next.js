'use client'

// MUI Imports
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useEffect, useState } from 'react'

const ProductAddHeader = () => {
  const [product, setProduct] = useState  ({
    title: '',
    description: '',
    price: 0
  })

  useEffect(() => {
    const draft = localStorage.getItem('draftProduct')
    if (draft) {
      setProduct(JSON.parse(draft))
    }
  }, [])

  const saveDraft = () => {
    localStorage.setItem('draftItem', JSON.stringify(product))
    alert('Borrador guardado correctamente')
  }
  
  const addProduct = () => {
    const published = JSON.parse(localStorage.getItem('publishedProducts') || '[]')
    localStorage.setItem('publishedProducts', JSON.stringify([...published, product]))

    localStorage.removeItem('draftProduct')
    setProduct({ title: '', description: '', price: 0 })

    alert('Producto publicado correctamente')
  }

  return (
    <div className='flex flex-wrap sm:items-center justify-between max-sm:flex-col gap-6'>
      <div>
        <Typography variant='h4' className='mbe-1'>
          Add a new product
        </Typography>
        <Typography>Orders placed across your store</Typography>
      </div>
      <div className='flex flex-wrap max-sm:flex-col gap-4'>
        <Button 
          variant='tonal' 
          color='secondary'
          onClick={() => setProduct({ title: '', description: '', price: 0 })}
        >
          Discard
        </Button>
        <Button 
          variant='tonal'
          onClick={saveDraft}
        >
          Save Draft
        </Button>
        <Button 
          variant='contained'
          onClick={addProduct}
        >
          Publish Product
        </Button>

        {/*  */}
      </div>
    </div>
  )
}

export default ProductAddHeader
