import { FaRegTrashAlt } from 'react-icons/fa';

export function TrashIcon({ className, onClick }) {
  return (
    <div>
      <FaRegTrashAlt className={className} onClick={onClick} />
    </div>
  );
}
