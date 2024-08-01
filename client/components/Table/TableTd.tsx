type Props = {
  children: number | string | JSX.Element | JSX.Element[];
  isAction?: boolean;
};

function TableTd({ children, isAction = false }: Props) {
  if (isAction) {
    return (
      <td className="px-6 py-4 h-full text-right space-x-2">{children}</td>
    );
  }

  return (
    <td className="px-6 py-4 whitespace-normal break-words">{children}</td>
  );
}

export default TableTd;
