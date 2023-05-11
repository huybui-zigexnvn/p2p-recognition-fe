import { AbilityBuilder, Ability } from '@casl/ability'

let ability = new Ability();

export default function defineAbilityFor(role) {
  const { can, cannot, rules } = new AbilityBuilder(Ability);

  if (role === "Admin") {
    can('manage', 'all');
  } else {
    cannot('read', 'staff')
  }

  return ability.update(rules);
}
