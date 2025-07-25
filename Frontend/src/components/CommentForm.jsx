const CommentForm = ({ name, setName, content, setContent, onSubmit }) => {
  return (
    <div className="max-w-3xl mx-auto mt-10">
      <p className="font-semibold mb-4">Add your comment</p>

      <form
        onSubmit={onSubmit}
        className="flex flex-col items-start gap-4 max-w-lg"
      >
        <input
          type="text"
          placeholder="Name"
          required
          className="w-full p-2 border border-gray-300 rounded outline-none"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <textarea
          placeholder="Comment"
          required
          className="w-full p-2 border border-gray-300 rounded outline-none h-48"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>

        <button
          type="submit"
          className="bg-primary text-white rounded p-2 px-8 hover:scale-102 transition-all cursor-pointer"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CommentForm;
