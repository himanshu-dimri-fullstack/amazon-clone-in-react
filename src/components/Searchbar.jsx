import { Search } from "lucide-react";

export default function Searchbar() {
    return (
        <div className="flex justify-center">
            <select name="select" className='bg-[#e6e6e6] text-[#555] text-sm p-2 my-1.5 rounded-l-lg border-[#e6e6e6]'>
                <option>All</option>
                <option>All</option>
                <option>All</option>
                <option>All</option>
            </select>
            <input name="input" className='bg-white border-[#e6e6e6] font-semibold text-md text-[#555] w-full my-1.5 p-2' placeholder="Search Amazon.in" />
            <button className='bg-[#febd69] w-12 flex justify-center p-2.5 my-1.5 rounded-r-lg'><Search className="w-5.5 h-5.5 text-black" /></button>
        </div>
    )
}
