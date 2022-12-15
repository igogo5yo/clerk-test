import React, { FC, useCallback, useState } from "react";
import styles from '../styles/InviteMembers.module.css'
import classNames from "classnames";
import Button from "./UI/Button";
import EnhancedSelect from "./UI/Select/EnhancedSelect";
import { IMember, IOption } from "../types";
import { useQuery, useQueryClient } from "react-query";
import { QUERIES } from "../constants";
import { fetchMembers, inviteMembers } from "../api";

export interface IInviteMembersProps {}

const InviteMembers: FC<IInviteMembersProps> = () => {
  const [options, setOptions] = useState<IOption[]>([]);

  const { data: members } = useQuery(QUERIES.MEMBERS, async () => {
    return await fetchMembers();
  });

  const queryClient = useQueryClient();

  const promiseOptions = useCallback((inputValue: string) => new Promise<IOption[]>((resolve) => {
    const options = (members || [])
      .filter(({ email }) => email.toLowerCase().includes(inputValue.toLowerCase()))
      .map(({ email }) => ({
        label: email,
        value: email
      }));

    resolve(options);
  }), [members]);

  const handleInvite = useCallback(async () => {
    if (!options.length) return;

    const emails = options.map(({ value }) => value);
    const toInvite = members?.filter(({ email }) => emails.includes(email)) || [];

    await inviteMembers(toInvite);
    await queryClient.refetchQueries(QUERIES.INVITED_MEMBERS);

    setOptions([]);
  }, [queryClient, options, members]);


  return (
    <div>
      <label className={classNames('body-p4', styles.label)} htmlFor="invite-members">Invite members</label>

      <div className={styles.container}>
        <EnhancedSelect<IOption>
          isAsync
          isMulti
          className={styles.select}
          id="invite-members"
          name="invite-members"
          value={options}
          loadOptions={promiseOptions}
          onChange={selected => {
            if (!selected) return;
            const values = Array.isArray(selected) ? selected : [selected];
            setOptions(values);
          }}
          noOptionsMessage={() => 'Enter email'}
        />
        <Button label="Send invite" onClick={handleInvite} />
      </div>
    </div>
  );
};

export default InviteMembers;
