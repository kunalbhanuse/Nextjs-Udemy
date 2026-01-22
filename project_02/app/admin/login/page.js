import Link from 'next/link'
import React from 'react'

function login() {
  return (
    <div>
      login
      <Link href={"/admin"}
              >admin</Link>
    </div>
  )
}

export default login
