import { Combobox, Transition } from '@headlessui/react'

import { SearchManufacturerProps } from '@/types'
import React from 'react'

const SearchMenuFacturer = ({ manufacturer, setManufacturer }: SearchManufacturerProps) => {
  return (
    <div className='search-manufacturer'>
        {/* <Combobox> */}
            {/* <div className='relative w-full'> */}
                {/* <Combobox.Button className="absolute top-[14px]">
                </Combobox.Button> */}
                {/* <Combobox.Input className="search-manufacturer__input" /> */}
            {/* </div> */}
        {/* </Combobox> */}
    </div>
  )
}

export default SearchMenuFacturer