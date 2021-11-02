import { createAction, createReducer } from '@reduxjs/toolkit'
import { Hamster } from '../models/Hamster'

import { useEffect, useState } from "react"


// Actions på böcker:
// const borrowBook = createAction<Loan>('borrow book')
// const returnBook = createAction<BookId>('return book')
const addHamster = createAction<Hamster>('Add hamster to gallery')
// strängarna är ID för boken som lånas eller återlämnas

// const getHamster = createAction('get hamsters')
const actions = { addHamster }



// Initial state - vanligtvis så hämtar vi datan från ett API
const initialState: Hamster[] = [
    {
        id: '123',
        name: "Sixten",
        age: 1,
        favFood: "ostbollar",
        loves: "springa i hamsterhjulet",
        imgName: "hamster-1.jpg",
        wins: 2,
        defeats: 3,
        games: 5
    }

]

const hamsterReducer = createReducer(initialState, {})


// Övning: ta reda på hur man kan ange typen för ett action-objekt
// const booksReducer = createReducer(initialState, {
// 	[borrowBook.toString()]: (state, action) => {
// 		const id: BookId = action.payload.bookId
// 		return state.map(book => {
// 			// Längre, kanske tydligare
// 			if( book.id !== id ) {
// 				return book
// 			} else {
// 				return { ...book, stock: book.stock - 1 }
// 			}
// 			// Mer kompakt alternativ
// 			// return book.id === id ? { ...book, stock: book.stock - 1 } : book
// 		})
// 	},


// })


export { actions, hamsterReducer }