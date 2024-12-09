import classNames from 'classnames';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const Container: React.FC<ContainerProps> = ({ children, className }) => {
  return <div className={classNames('container', className)}>{children}</div>;
};

export default Container;