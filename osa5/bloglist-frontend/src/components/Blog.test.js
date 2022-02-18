import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

const blog = {
  title: 'Uusi blogaus',
  author: 'Kirjoittaja Kimmo',
  url: 'www.blog.fi',
  likes: 0,
  user: {
    username: 'Meitsi',
    name: 'Meitsi',
  },
}

test('renders the blogs correctly', () => {
  const component = render(<Blog blog={blog} />)

  expect(component.container).toHaveTextContent(
    'Uusi blogaus by Kirjoittaja Kimmoview'
  )
})

test('clicking the button displays the blog correctly', async () => {
  const component = render(<Blog blog={blog} />)

  const button = component.getByText('view')
  fireEvent.click(button)
  expect(component.container).toHaveTextContent(
    'Uusi blogaus by Kirjoittaja Kimmohidewww.blog.fiMeitsiLikes 0likeremove'
  )
})

test('clicking the like button twice eventhandler is called two times', async () => {
  const mockHandler = jest.fn()

  const component = render(<Blog blog={blog} handleLike={mockHandler} />)

  const viewButton = component.getByText('view')
  fireEvent.click(viewButton)

  const like = component.getByText('like')
  fireEvent.click(like)
  fireEvent.click(like)

  expect(mockHandler.mock.calls).toHaveLength(2)
})
