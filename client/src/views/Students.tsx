//Adding; Removing; Updating students

import StudentsList from '../components/StudentsList'

import { BarsArrowUpIcon, ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'

export default function Students() {

  return (
    <div className="border-b lg:ml-80 mx-4 border-gray-200 pb-5 sm:flex-col sm:items-start sm:justify-around">
      <h3 className="text-base mb-4 font-semibold leading-6 text-center text-gray-900 ">Students</h3>
      <div className="mt-3 sm:ml-4 sm:mt-0">
        <label htmlFor="mobile-search-candidate" className="sr-only">
          Search
        </label>
        <label htmlFor="desktop-search-candidate" className="sr-only">
          Search
        </label>
        <div className="flex rounded-md shadow-sm">
          <div className="relative flex-grow focus-within:z-10">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <input
              type="text"
              name="mobile-search-candidate"
              id="mobile-search-candidate"
              className="block w-full rounded-none rounded-l-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:hidden"
              placeholder="Search"
            />
            <input
              type="text"
              name="desktop-search-candidate"
              id="desktop-search-candidate"
              className="hidden w-full rounded-none rounded-l-md border-0 py-1.5 pl-10 text-sm leading-6 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:block"
              placeholder="Search students"
            />
          </div>
          <button
            type="button"
            className="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            <BarsArrowUpIcon className="-ml-0.5 h-5 w-5 text-gray-400" aria-hidden="true" />
            Sort
            <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
          </button>
        </div>
      </div>
      <StudentsList />
    </div>
  )
}
