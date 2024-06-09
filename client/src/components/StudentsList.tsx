import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import { AxiosInstance } from 'axios';
import { useEffect, useState } from 'react';


interface Props {
  http: AxiosInstance;
  searchOption: string;
  finalValue: number;
}

interface Student {
  _id: string;
  name: string;
  grade: string;
  studentId: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}


function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

const StudentsList: React.FC<Props> = ({ http, searchOption, finalValue }) => {

  const [allStudents, setAllStudents] = useState<Student[]>([])
  
 
useEffect(() => {
  const getStudents = async () => {
    if(searchOption === "All") {
      try{
        const response = await http.get("/students")
        console.log("Response Data:", response.data)
        if (Array.isArray(response.data)) {
          setAllStudents(response.data);
        } else {
          setAllStudents([response.data]);
        }
      }
      catch(err){
        console.error(err)
        alert("Error fetching students")
      }
    } else if (searchOption === "StudentID") {
      try{
        const response = await http.get(`/students/${finalValue}`)
        console.log("Response Data:", response.data)
        if (Array.isArray(response.data)) {
          setAllStudents(response.data);
        } else {
          setAllStudents([response.data]);
        }
      }
      catch(err){
        console.error(err)
        alert("Error fetching students")
      }
    } else if (searchOption === "Grade") {
      try{
        const response = await http.get("/students/grade", {params: { finalValue },
      })
        console.log("Response Data:", response.data)
        if (Array.isArray(response.data)) {
          setAllStudents(response.data);
        } else {
          setAllStudents([response.data]);
        }
      }
      catch(err){
        console.error(err)
        alert("Error fetching students")
      }
    }
  }
  getStudents()

}, [searchOption, finalValue])


  return (
    <div>
    <ul role="list" className="divide-y divide-gray-100">
      {allStudents.map((student) => (
        <li key={student._id} className="flex items-center justify-between gap-x-6 py-5">
          <div className="min-w-0">
            <div className="flex items-start gap-x-3">
              <p className="text-sm font-semibold leading-6 text-gray-900">{student.name}</p>
              <p
                className="rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset"
              >
                Grade: {student.grade}
              </p>
            </div>
            <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
              <p className="whitespace-nowrap">
                StudentID: {student.studentId}
              </p>
            </div>
          </div>
          <div className="flex flex-none items-center gap-x-4">
            <a
              // href={project.href}
              className="hidden rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:block"
            >
              Student Details<span className="sr-only">, {student.name}</span>
            </a>
            <Menu as="div" className="relative flex-none">
              <MenuButton className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                <span className="sr-only">Open options</span>
                <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
              </MenuButton>
              <Transition
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <MenuItems className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                  <MenuItem>
                    {({ focus }) => (
                      <a
                        href="/"
                        className={classNames(
                          focus ? 'bg-gray-50' : '',
                          'block px-3 py-1 text-sm leading-6 text-gray-900'
                        )}
                      >
                        Edit<span className="sr-only">, {student.name}</span>
                      </a>
                    )}
                  </MenuItem>
                  <MenuItem>
                    {({ focus }) => (
                      <a
                        href="#"
                        className={classNames(
                          focus ? 'bg-gray-50' : '',
                          'block px-3 py-1 text-sm leading-6 text-gray-900'
                        )}
                      >
                        Delete<span className="sr-only">, {student.name}</span>
                      </a>
                    )}
                  </MenuItem>
                </MenuItems>
              </Transition>
            </Menu>
          </div>
        </li>
      ))}
    </ul>
    </div>
  )
}
export default StudentsList