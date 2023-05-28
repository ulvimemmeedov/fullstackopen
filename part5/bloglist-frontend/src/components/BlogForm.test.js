import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';

import BlogForm from './BlogForm';

const blog = {
  author: 'Example author',
  title: 'Example title',
  url: 'https://example.com/blog',
};

const setup = (props) => ({
  user: userEvent.setup(),
  ...render(<BlogForm showNotification={jest.fn()} {...props} />),
  authorInput: screen.getByRole('textbox', { name: /author/i }),
  submitButton: screen.getByRole('button', { name: /create/i }),
  titleInput: screen.getByRole('textbox', { name: /title/i }),
  urlInput: screen.getByRole('textbox', { name: /url/i }),
});

it('calls onCreate with the entered data when submitting', async () => {
  const handleCreate = jest.fn();
  const { user, authorInput, submitButton, titleInput, urlInput } = setup({
    onCreate: handleCreate,
  });

  await user.type(authorInput, blog.author);
  await user.type(titleInput, blog.title);
  await user.type(urlInput, blog.url);
  await user.click(submitButton);

  expect(handleCreate.mock.calls).toHaveLength(1);

  const argument = handleCreate.mock.calls[0][0];
  Object.keys(blog).forEach((key) => expect(argument[key]).toEqual(blog[key]));
});
