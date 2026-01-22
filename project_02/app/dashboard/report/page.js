import Link  from 'next/link'
import React from 'react'

function report() {
  return (
    <div>
      <h1>Report Page</h1>
      <Link href={"/admin"}>Go to Admin</Link>
      
      </div>
  )
}

export default report
