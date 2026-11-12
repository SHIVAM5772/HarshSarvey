import { GENDERS, type PersonalDetails } from "@/lib/profile-validation";
import styles from "./admin.module.css";

export default function PersonalFields({ details, prefix }: { details?: Partial<PersonalDetails>; prefix: string }) {
  return <div className={styles.personalFields}>
    <label htmlFor={`${prefix}-name`}>Full name<input id={`${prefix}-name`} name="name" defaultValue={details?.name || ""} autoComplete="name" required maxLength={100} /></label>
    <label htmlFor={`${prefix}-phone`}>Phone number<input id={`${prefix}-phone`} name="phone" type="tel" defaultValue={details?.phone || ""} autoComplete="tel" maxLength={25} /></label>
    <label htmlFor={`${prefix}-dob`}>Date of birth<input id={`${prefix}-dob`} name="dob" type="date" defaultValue={details?.dob || ""} min="1900-01-01" max={new Date().toISOString().slice(0, 10)} autoComplete="bday" /></label>
    <label htmlFor={`${prefix}-gender`}>Gender<select id={`${prefix}-gender`} name="gender" defaultValue={details?.gender || ""}><option value="">Select gender</option>{GENDERS.map(gender => <option key={gender}>{gender}</option>)}</select></label>
    <label className={styles.fullWidth} htmlFor={`${prefix}-address`}>Address<textarea id={`${prefix}-address`} name="address" defaultValue={details?.address || ""} autoComplete="street-address" rows={3} maxLength={500} /></label>
  </div>;
}
