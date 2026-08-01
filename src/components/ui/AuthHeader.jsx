const AuthHeader = ({ title, subtitle }) => {
  return (
    <div className="mt-12">
      <h1 className="text-4xl font-black tracking-tight text-white">
        {title}
      </h1>

      <p className="mt-4 text-gray-400 leading-7">
        {subtitle}
      </p>
    </div>
  );
};

export default AuthHeader;