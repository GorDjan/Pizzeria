import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = (props) => (
  <ContentLoader 
	 className="PizzaBlock"
    speed={2}
    width={280}
    height={500}
    viewBox="0 0 280 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="-1" y="297" rx="10" ry="10" width="280" height="85" /> 
    <rect x="0" y="408" rx="10" ry="10" width="95" height="30" /> 
    <rect x="126" y="397" rx="27" ry="27" width="152" height="45" /> 
    <rect x="0" y="248" rx="10" ry="10" width="280" height="28" /> 
    <circle cx="136" cy="125" r="121" />
  </ContentLoader>
)

export default Skeleton