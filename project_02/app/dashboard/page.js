import React from 'react'
import  Link  from 'next/link'

function dashboard() {
  return (
    <div>
      <h1>dashboard</h1>
      <Link href={"/dashboard/report"}
      >Go to Report</Link>

    </div>
  )
}

export default dashboard
