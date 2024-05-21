import Button from '@/components/ui/formElements/Button'
import { FC } from 'react'

const AdminCreateButton: FC<{ onClick: () => void }> = ({ onClick }) => {
	return <Button onClick={onClick}>Create new</Button>
}

export default AdminCreateButton
