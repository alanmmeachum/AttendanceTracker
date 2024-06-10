//Adding; Removing; Updating students

import StudentsList from '../components/StudentsList'
import { AxiosInstance } from 'axios';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { useState } from 'react';

interface Props {
  http: AxiosInstance;
}

const Students: React.FC<Props> = ({ http }) => {

  const [searchOption, setSearchOption] = useState("All")
  const [searchParams, setSearchParams] = useState<any>()
  const [finalValue, setFinalValue] = useState<any>()

  const handleChange = (e: { target: { value: any; }; }) => {
    setSearchParams(e.target.value)
  }

  const handleBlur = () => {
    setFinalValue(searchParams);
  }

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
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
          <button className='rounded-none px-4 border-0 text-sm leading-6 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:block'>
            <select name="studentoptions" onChange={(e) => setSearchOption(e.target.value)} id="student-options">
              <option value="All">All</option>
              <option value="StudentID">StudentID</option>
              <option value="Grade">Grade</option>
            </select>
          </button>
        </div>
      </div>
      <StudentsList http={http} searchOption={searchOption} finalValue={finalValue}/>
    </div>
  )
}
export default Students