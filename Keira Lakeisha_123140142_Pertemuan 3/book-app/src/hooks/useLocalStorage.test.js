import { renderHook, act } from '@testing-library/react';
import { useLocalStorage } from './useLocalStorage';

describe('useLocalStorage Hook', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('returns initial value when no stored value exists', () => {
    const { result } = renderHook(() => useLocalStorage('testKey', 'initial'));
    expect(result.current[0]).toBe('initial');
  });

  test('saves value to localStorage', () => {
    const { result } = renderHook(() => useLocalStorage('testKey', 'initial'));
    
    act(() => {
      result.current[1]('updated value');
    });

    expect(result.current[0]).toBe('updated value');
    expect(localStorage.getItem('testKey')).toBe(JSON.stringify('updated value'));
  });

  test('loads existing value from localStorage', () => {
    localStorage.setItem('testKey', JSON.stringify('stored value'));
    
    const { result } = renderHook(() => useLocalStorage('testKey', 'initial'));
    
    expect(result.current[0]).toBe('stored value');
  });

  test('handles arrays correctly', () => {
    const { result } = renderHook(() => useLocalStorage('arrayKey', []));
    
    act(() => {
      result.current[1]([1, 2, 3]);
    });

    expect(result.current[0]).toEqual([1, 2, 3]);
  });

  test('handles objects correctly', () => {
    const { result } = renderHook(() => useLocalStorage('objectKey', {}));
    
    act(() => {
      result.current[1]({ name: 'Test', value: 123 });
    });

    expect(result.current[0]).toEqual({ name: 'Test', value: 123 });
  });
});