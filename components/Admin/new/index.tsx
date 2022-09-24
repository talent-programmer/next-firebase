import {useState} from "react";
import {BiAddToQueue} from 'react-icons/bi'
import CategorySelector from "./categorySelector";
import CustomEditor from "./editor";
function NewPost() {
  const [categories, setCategories] = useState([]);
  const [body, setBody] = useState('');
  const [title, setTitle] = useState('');

  // handle category change
  const handleCategoryChange = (selectedCategories: any) => {
    const options = selectedCategories.map((category: any) => {
      return category.value
    })
    setCategories(options)
    console.log(options)
  }
  return (
    <div className="w-full h-full bg-white p-4 poppins">
      <form action="" method="post" autoComplete="off" autoCorrect="on" autoSave="on">
        <h1 className="font-bold text-xl capitalize text-primary font-sans mb-4">
          Create a New Post
        </h1>
        <div className="flex flex-col mb-3">
          <label
            htmlFor="large-input"
            className="block mb-2 font-medium text-gray-900"
          >
            Title
          </label>
          <input
            type="text"
            id="large-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="block p-2 px-4 w-full text-gray-900  rounded-lg outline-none border bg-white border-gray-300"
            placeholder="Title"
          />
        </div>
        <div className="flex flex-col mb-3">
          <label
            htmlFor="large-input"
            className="block mb-2 font-medium text-gray-900"
          >
            Category
          </label>
          <CategorySelector onChange={handleCategoryChange} />
        </div>
        <div className="flex flex-col mb-3">
          <label
            htmlFor="body"
            className="block mb-2 font-medium text-gray-900"
          >
            Body
          </label>
          <CustomEditor val={body} setVal={setBody} />
        </div>
        <div className="flex flex-col mb-3 items-end">
            {/* submit button */}
            <button
                type="submit"
                className="bg-primary flex items-center justify-center gap-3 hover:bg-active text-white font-bold py-2 px-4 rounded-lg w-36 transition-all ease-in-out duration-100"
            >
                <BiAddToQueue />
                New
            </button>

        </div>
      </form>
    </div>
  );
}

export default NewPost;
