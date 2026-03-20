// import React, { useEffect, useState } from 'react'
// import Select from 'react-select'
// import { getAllSubCategory } from '../../../../Store/features/category/categorySlice'
// import { useDispatch, useSelector } from 'react-redux'

// export default function SelectCategory({category}) {
//   const dispatch = useDispatch()
//   const { isLoading, childCategories } = useSelector((state) => state.category)
//   const [formattedOptions, setFormattedOptions] = useState([])

//   const [chooseCategory, setChooseCategory] = useState([])  

//   useEffect(() => {
//     dispatch(getAllSubCategory())
//   }, [dispatch])

//   useEffect(() => {
//     if (childCategories) {
//       const options = childCategories.map((category) => ({
//         value: category._id, 
//         label: `${category.name} >> ${category.parentCategory.name}`
//       }))
//       setFormattedOptions(options)
//     }
//   }, [childCategories])



//   return (
//     <div>
//       <Select
//         isMulti
//         name="categories"
//         options={formattedOptions}
//         className="basic-multi-select"
//         classNamePrefix="select"
//         onChange={setChooseCategory}  
//       />
//     </div>
//   )
// }





// import React, { useEffect, useState } from 'react'
// import Select from 'react-select'
// import { getAllSubCategory } from '../../../../Store/features/category/categorySlice'
// import { useDispatch, useSelector } from 'react-redux'

// export default function SelectCategory({ onCategoryChange,value }) {
//   const dispatch = useDispatch()
  
//   const { isLoading, childCategories } = useSelector((state) => state.category)
//   const [formattedOptions, setFormattedOptions] = useState([])

//   const [chooseCategory, setChooseCategory] = useState([])  // Initialize as an array for multiple selections

//   useEffect(() => {
//     dispatch(getAllSubCategory())
//   }, [dispatch])

//   useEffect(() => {
//     if (childCategories) {
//       const options = childCategories.map((category) => ({
//         value: category._id, 
//         label: `${category.name} >> ${category.parentCategory.name}`
//       }))
//       setFormattedOptions(options)
//     }
//     // debugger
//     const oldCategory=value
//   }, [childCategories])

//   // Whenever the selected categories change, call the callback to pass the data to the parent
//   const handleCategoryChange = (selectedOptions) => {
//     setChooseCategory(selectedOptions)
//     if (onCategoryChange) {
//       onCategoryChange(selectedOptions)  // Passing data back to the parent
//     }
//   }

//   return (
//     <div>
//       <Select
//         isMulti
//         name="categories"
//         options={formattedOptions}
//         className="basic-multi-select"
//         classNamePrefix="select"
//         onChange={handleCategoryChange}  
//         value={oldCategory}
//       />
//     </div>
//   )
// }




// import React, { useEffect, useState } from 'react'
// import Select from 'react-select'
// import { getAllSubCategory } from '../../../../Store/features/category/categorySlice'
// import { useDispatch, useSelector } from 'react-redux'

// export default function SelectCategory({ onCategoryChange, value }) {
//   const dispatch = useDispatch()
//   const { isLoading, childCategories } = useSelector((state) => state.category)
//   const [formattedOptions, setFormattedOptions] = useState([])
//   const [selectedCategories, setSelectedCategories] = useState([])  // Manage selected categories

//   // Fetch child categories on component mount
//   useEffect(() => {
//     dispatch(getAllSubCategory())
//   }, [dispatch])

//   useEffect(() => {
//     if (childCategories) {
//       const options = childCategories.map((category) => ({
//         value: category._id, 
//         label: `${category.name} >> ${category.parentCategory.name}`
//       }))
//       setFormattedOptions(options)

//       if (value) {
//         const initialSelectedCategories = options.filter(option =>
//           value.some(v => v._id === option.value) // Match by _id
//         )
//         setSelectedCategories(initialSelectedCategories||)
//       }
//     }
//   }, [childCategories, value])

//   const handleCategoryChange = (selectedOptions) => {
//     setSelectedCategories(selectedOptions)
//     if (onCategoryChange) {
//       onCategoryChange(selectedOptions) 
//     }
//   }

//   return (
//     <div>
//       <Select
//         isMulti
//         name="categories"
//         options={formattedOptions}
//         className="basic-multi-select"
//         classNamePrefix="select"
//         onChange={handleCategoryChange}  
//         value={selectedCategories}  
//       />
//     </div>
//   )
// }



import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import { getAllSubCategory } from '../../../../Store/Feature/category/categorySlice'
import { useDispatch, useSelector } from 'react-redux'

export default function SelectCategory({ onCategoryChange, value }) {
  const dispatch = useDispatch()
  const { isLoading, childCategories } = useSelector((state) => state.category)
  const [formattedOptions, setFormattedOptions] = useState([])
  const [selectedCategories, setSelectedCategories] = useState([])

  useEffect(() => {
    dispatch(getAllSubCategory())
  }, [dispatch])

  useEffect(() => {
    if (childCategories) {
      const options = childCategories.map((category) => ({
        value: category._id, 
        label: ` ${category?.parentCategory?.Name} >> ${category?.Name}`
      }))
      setFormattedOptions(options)

      if (value) {
        const initialSelectedCategories = options.filter(option =>
          value.some(v => v._id === option.value) 
        )
        setSelectedCategories(initialSelectedCategories)
      }
    }
  }, [childCategories, value])  

  const handleCategoryChange = (selectedOptions) => {
    setSelectedCategories(selectedOptions)  
    if (onCategoryChange) {
      const selectedValues = selectedOptions.map(option => ({ _id: option.value }))
      onCategoryChange(selectedValues)  
    }
  }

  return (
    <div>
      <Select
        isMulti
        name="categories"
        options={formattedOptions}
        className="basic-multi-select"
        classNamePrefix="select"
        onChange={handleCategoryChange}  
        value={selectedCategories}  
      />
    </div>
  )
}
