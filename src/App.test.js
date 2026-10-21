import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import App from './App';
import BookList from './pages/BookList';
import AddBook from './pages/AddBook';

jest.mock('axios');
const sample = [
  { id: 1, title: 'Dế Mèn phiêu lưu ký', author: 'Tô Hoài', year: 1941, category: 'Văn học', available: true },
  { id: 3, title: 'Clean Code', author: 'Robert C. Martin', year: 2008, category: 'CNTT', available: true },
];
let container;
let root;
const render = async (component, path = '/') => {
  await act(async () => root.render(<MemoryRouter initialEntries={[path]} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>{component}</MemoryRouter>));
};
const input = (element, value) => {
  const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set;
  setter.call(element, value);
  element.dispatchEvent(new Event('input', { bubbles: true }));
};
beforeEach(() => {
  global.IS_REACT_ACT_ENVIRONMENT = true;
  localStorage.clear();
  jest.clearAllMocks();
  axios.isCancel.mockReturnValue(false);
  container = document.createElement('div');
  document.body.appendChild(container);
  root = createRoot(container);
});
afterEach(async () => {
  await act(async () => root.unmount());
  container.remove();
  jest.useRealTimers();
});
test('loads API, updates loan state and persists changes', async () => {
  axios.get.mockResolvedValue({ data: sample });
  await render(<App />, '/books');
  expect(axios.get).toHaveBeenCalledWith('/data/books.json', expect.objectContaining({ signal: expect.any(AbortSignal) }));
  await act(async () => container.querySelector('tbody button').click());
  expect(container.querySelector('tbody').textContent).toContain('Đang mượn');
  expect(JSON.parse(localStorage.getItem('gk_books'))[0].available).toBe(false);
});
test('saved empty library skips API and shows zero statistics', async () => {
  localStorage.setItem('gk_books', '[]');
  await render(<App />);
  expect(axios.get).not.toHaveBeenCalled();
  expect([...container.querySelectorAll('.stat-label strong')].map(node => node.textContent)).toEqual(['0', '0', '0']);
});
test('API failure displays the required error without saving empty data', async () => {
  axios.get.mockRejectedValue(new Error('Network error'));
  await render(<App />);
  expect(container.textContent).toContain('Không tải được dữ liệu');
  expect(localStorage.getItem('gk_books')).toBeNull();
});
test('search waits 500 ms and combines with category filter', async () => {
  jest.useFakeTimers();
  await render(<BookList books={sample} onDelete={jest.fn()} onToggle={jest.fn()} />);
  await act(async () => input(container.querySelector('input'), 'CODE'));
  expect(container.textContent).toContain('Đang tìm...');
  expect(container.querySelectorAll('tbody tr')).toHaveLength(2);
  await act(async () => jest.advanceTimersByTime(499));
  expect(container.querySelectorAll('tbody tr')).toHaveLength(2);
  await act(async () => jest.advanceTimersByTime(1));
  expect(container.querySelectorAll('tbody tr')).toHaveLength(1);
  expect(container.querySelector('tbody').textContent).toContain('Clean Code');
  await act(async () => {
    const select = container.querySelector('select');
    select.value = 'Văn học';
    select.dispatchEvent(new Event('change', { bubbles: true }));
  });
  expect(container.textContent).toContain('Tìm thấy 0 cuốn sách');
  expect(container.textContent).toContain('Không có dữ liệu');
});
test('form validates missing values before invalid year', async () => {
  const onAdd = jest.fn();
  await render(<AddBook onAdd={onAdd} />);
  const submit = async () => act(async () => container.querySelector('form').dispatchEvent(new Event('submit', { bubbles: true, cancelable: true })));
  await submit();
  expect(container.textContent).toContain('Vui lòng nhập đầy đủ thông tin');
  await act(async () => {
    input(container.querySelector('#title'), 'Sách mới');
    input(container.querySelector('#author'), 'Tác giả');
    input(container.querySelector('#year'), '2000.5');
  });
  await submit();
  expect(container.textContent).toContain('Năm xuất bản phải từ 1900 đến 2026');
  expect(onAdd).not.toHaveBeenCalled();
});
test.each(['/books/99', '/books/abc'])('unknown detail %s', async path => {
  localStorage.setItem('gk_books', JSON.stringify(sample));
  await render(<App />, path);
  expect(container.textContent).toContain('Không tìm thấy sách');
  expect(container.querySelectorAll('nav .active')).toHaveLength(0);
});

