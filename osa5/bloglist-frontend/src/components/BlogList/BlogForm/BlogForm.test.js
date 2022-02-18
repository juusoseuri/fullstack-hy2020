import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

test('Form works correctly and calls with corrct parameters onSubmit', async () => {
  const createBlog = jest.fn()

  const component = render(<BlogForm createBlog={createBlog} />)

  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(title, {
    target: { value: 'example title' },
  })
  fireEvent.change(author, {
    target: { value: 'example author' },
  })
  fireEvent.change(url, {
    target: { value: 'example url' },
  })
  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('example title')
  expect(createBlog.mock.calls[0][0].author).toBe('example author')
  expect(createBlog.mock.calls[0][0].url).toBe('example url')
})
