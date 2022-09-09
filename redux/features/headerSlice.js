import { BookmarksFillIcon, BookmarksIcon, ContinentsFillIcon, ContinentsIcon, CountriesFillIcon, CountriesIcon, SearchFillIcon, SearchIcon } from '@/helper/Icon';
import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    menuList: [
        {
            ID: 1,
            Name: 'All Countries',
            Src: '/',
            Icon: <CountriesIcon />,
            IconFill: <CountriesFillIcon />,
        },
        {
            ID: 2,
            Name: 'Continents',
            Src: '/continents',
            Icon: <ContinentsIcon />,
            IconFill: <ContinentsFillIcon />,
        },
        {
            ID: 3,
            Name: 'Search',
            Src: '/search',
            Icon: <SearchIcon />,
            IconFill: <SearchFillIcon />,
        },
        {
            ID: 4,
            Name: 'Saved',
            Src: '/saved',
            Icon: <BookmarksIcon />,
            IconFill: <BookmarksFillIcon />,
        },
    ]
}

export const headerSlice = createSlice({
    name: 'header',
    initialState,
    reducers: {
        // getRandom: (state, action) => {
        //     const random = Math.floor(Math.random() * action.payload)
        //     state.random = random
        // }
    }
})

// export const { getRandom } = headerSlice.actions

export default headerSlice.reducer