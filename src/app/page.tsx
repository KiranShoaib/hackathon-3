import Hero from "@/components/Hero";
import Brand from "@/components/Brand";
import Ceramics from "@/components/Ceramics";
import List from "@/components/List";
import SignUp from "@/components/Sign-up";
import Quality from "@/components/Quality";

function Home(){
  return( 
    <div>
      <Hero/>
      <Brand/>
      <Ceramics/>
      <List/>
      <SignUp/>
      <Quality/>
    </div>

  )
}

export default Home