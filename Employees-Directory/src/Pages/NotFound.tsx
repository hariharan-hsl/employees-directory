import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex min-h-[75vh] box-border items-center justify-center p-5">
      <div className="max-w-[500px] text-center">
        <h1 className="m-0 text-[110px] leading-none font-extrabold text-[#08764f] max-[480px]:text-[75px]">404</h1>

        <h2 className="mt-5 mb-3 text-[28px] text-[#172033] max-[480px]:text-[22px]">Oops! Page Not Found</h2>

        <p className="mb-7 text-base leading-[1.6] text-[#737b85] max-[480px]:text-sm">
          Sorry, the page you are looking for doesn't exist
          or may have been moved.
        </p>

        <Link to="/" className="inline-flex items-center justify-center gap-2.5 rounded-lg bg-[#08764f] px-[22px] py-3 text-[15px] font-semibold text-white no-underline transition-colors duration-200 hover:bg-[#065f40]">
          <i className="fa-solid fa-arrow-left"></i>
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;