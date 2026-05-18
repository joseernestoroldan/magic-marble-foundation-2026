import { getAllPaddyField, getAllRecipes } from "@/client";

const PortalPaddyFieldPage = async () => {
  const paddyfields = await getAllPaddyField();
  const recipes = await getAllRecipes()

  return (
    <div>PortalPaddyFieldPage</div>
  )
}

export default PortalPaddyFieldPage



