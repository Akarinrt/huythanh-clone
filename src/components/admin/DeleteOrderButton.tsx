'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function DeleteOrderButton({ orderId }: { orderId: number }) {
  const [isDeleting, setIsDeleting] = useState(false)
  const router = useRouter()

  const handleDelete = async () => {
    if (!confirm(`Bạn có chắc chắn muốn xóa Đơn hàng #${orderId} không? Hành động này không thể hoàn tác.`)) {
      return
    }

    setIsDeleting(true)
    try {
      const res = await fetch(`/api/admin/orders/${orderId}`, {
        method: 'DELETE'
      })

      if (res.ok) {
        alert('Đã xóa đơn hàng thành công!')
        router.refresh()
      } else {
        alert('Xóa thất bại, vui lòng thử lại sau.')
        setIsDeleting(false)
      }
    } catch (error) {
      console.error(error)
      alert('Đã xảy ra lỗi khi xóa đơn hàng.')
      setIsDeleting(false)
    }
  }

  return (
    <button 
      onClick={handleDelete}
      disabled={isDeleting}
      style={{
        background: '#fff',
        color: '#e55',
        border: '1px solid #e55',
        padding: '0.4rem 1rem',
        borderRadius: '4px',
        fontSize: '0.85rem',
        cursor: isDeleting ? 'not-allowed' : 'pointer',
        opacity: isDeleting ? 0.6 : 1,
        transition: 'all 0.2s',
        fontWeight: '500'
      }}
    >
      {isDeleting ? 'Đang xóa...' : 'Xóa Đơn'}
    </button>
  )
}
