import './floatingContainer.scss';

type FloatingContainerProps = {
  children: React.ReactNode;
};

const FloatingContainer = ({ children }: FloatingContainerProps) => {
  return (
    <div
      style={{
        backgroundColor: "var(--shadow)"
      }}
      className="fixed top-0 left-0 w-full h-full flex z-40 justify-center items-center"
    >
      {children}
    </div>
  );
};

export default FloatingContainer;
