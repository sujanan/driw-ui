function ChevronLeftIcon(props) {
  return (
    <svg fill="currentColor" viewBox="0 0 24 24" stroke="none" {...props}>
      <path
        fillRule="evenodd"
        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function ChevronRightIcon(props) {
  return (
    <svg fill="currentColor" viewBox="0 0 24 24" stroke="none" {...props}>
      <path
        fillRule="evenodd"
        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default function PaginationNav({ page, onPageChange, pageCount }) {
  return (
    <nav className="inline-flex">
      <button
        className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150"
        onClick={() => {
          if (page > 0) {
            onPageChange(page - 1);
          }
        }}
      >
        <ChevronLeftIcon className="w-5 h-5" />
      </button>
      {[...Array(pageCount).keys()].map((i) => (
        <button
          key={i}
          className="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
          onClick={() => {
            onPageChange(i);
          }}
        >
          {i + 1}
        </button>
      ))}
      <button
        className="-ml-px relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150"
        onClick={() => {
          if (page < pageCount - 1) {
            onPageChange(page + 1);
          }
        }}
      >
        <ChevronRightIcon className="w-5 h-5" />
      </button>
    </nav>
  );
}
