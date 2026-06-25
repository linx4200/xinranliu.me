import { SkillSet } from "./SkillSet";
import { getSkillSets } from "@/services/skills";

export const SkillSetList = ({ lang }: { lang: string }) => {
  const list = getSkillSets(lang);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-10 mt-10 px-4 lg:px-0" dev-mode="tailwind">
      {list.map(skillSet => (
        <div key={skillSet.title} className="w-full max-w-md lg:max-w-none mx-auto">
          <SkillSet {...skillSet} />
        </div>
      ))}
    </div>
  )
}