import React, { FC, useMemo, useState } from "react";
import { ColumnDef, createColumnHelper } from "@tanstack/table-core";
import { useQuery, useQueryClient } from "react-query";
import RemoveButton from "./UI/RemoveButton";
import Table from "./UI/Table";
import EnhancedSelect from "./UI/Select/EnhancedSelect";
import InboxesValueContainer from "./UI/Select/InboxesValueContainer";
import CheckBoxOption from "./UI/Select/CheckBoxOption";
import { IMember, IOption, TRole } from "../types";
import { inboxes, QUERIES, roles } from "../constants";
import Gear from './UI/icons/gear.svg';
import Role from './UI/icons/role.svg';
import Search from './UI/icons/search.svg';
import Letter from './UI/icons/letter.svg';
import Inbox from './UI/icons/inbox.svg';
import styles from "../styles/MembersTable.module.css";
import { deleteMember, updateMember } from "../api";

const rolesOptions: IOption[] = [];
for(let [value, label] of roles.entries()) {
  rolesOptions.push({ value, label });
}

const columnHelper = createColumnHelper<IMember>();

const MembersTable: FC = () => {
  const [search, setSearch] = useState<string>('');
  const queryClient = useQueryClient();

  const { data } = useQuery(QUERIES.INVITED_MEMBERS, async () => {
    const res = await fetch('/api/invited');
    return await res.json() as IMember[];
  });

  const columns = useMemo<ColumnDef<IMember>[]>(() => [
    columnHelper.display({
      id: 'fullName',
      cell: ({ row }) => (
        <div className={styles.nameCell}>
          <img className={styles.avatar} alt={row.original.fullName} src={row.original.avatar} />
          <div className={styles.nameWrapper}>
            <span className="body-p3">{row.original.fullName}</span>
            {row.original.isPending && (
              <div className={styles.pending}>
                <Letter />
                <span>Pending</span>
              </div>
            )}
          </div>
        </div>
      ),
      header: 'Name'
    }),
    columnHelper.display({
      id: 'inboxes',
      cell: ({ row }) => (
        <div className={styles.inboxCell}>
          <EnhancedSelect<IOption>
            isMulti
            hideSelectedOptions={false}
            showDropdownIndicator
            options={inboxes}
            components={{
              Option: CheckBoxOption,
              ValueContainer: InboxesValueContainer,
            }}
            onChange={async (nextInboxes) => {
              if (!nextInboxes) return;
              const inboxes = Array.isArray(nextInboxes) ? nextInboxes : [];

              await updateMember({...row.original, inboxes: inboxes.map(({ value }) => value)});
              await queryClient.refetchQueries(QUERIES.INVITED_MEMBERS);
            }}
            value={row.original.inboxes.map(inbox => ({ value: inbox, label: inbox }))}
          />
        </div>
      ),
      header: () => (
        <div className={styles.headerWithIcon}>
          <Inbox className={styles.headerIcon} />
          <span>Inboxes</span>
        </div>
      )
    }),
    columnHelper.display({
      id: 'role',
      cell: ({ row }) => (
        <div className={styles.inboxCell}>
          <EnhancedSelect<IOption>
            showDropdownIndicator
            options={rolesOptions}
            onChange={async (value) => {
              const nextRole = value ? (value as IOption).value : 'member';

              await updateMember({...row.original, role: nextRole as TRole });
              await queryClient.refetchQueries(QUERIES.INVITED_MEMBERS);
            }}
            value={{ value: row.original.role, label: String(roles.get(row.original.role)) }}
          />
        </div>
      ),
      header: () => (
        <div className={styles.headerWithIcon}>
          <Role className={styles.headerIcon} />
          <span>Role</span>
        </div>
      )
    }),
    columnHelper.display({
      size: 80,
      id: 'action',
      cell: ({ row }) => (
        <div className={styles.actionCell}>
          <RemoveButton onClick={async () => {
            await deleteMember(row.original.email);
            await queryClient.refetchQueries(QUERIES.INVITED_MEMBERS);
          }} />
        </div>
      ),
      header: () => (
        <div className={styles.headerWithIcon}>
          <Gear className={styles.headerIcon} />
          <span>Action</span>
        </div>
      )
    }),
  ], [queryClient]);

  const filteredData = useMemo(() => {
    const d = data || [];
    if (!search.length) return d;

    return d.filter(member => member.fullName.toLowerCase().includes(search));
  }, [data, search]);

  return (
    <div>
      <div className={styles.searchInputContainer}>
        <Search className={styles.searchInputIcon} />
        <input
          placeholder="Search"
          className={styles.searchInput}
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value.toLowerCase())}
        />
      </div>
      <Table<IMember> data={filteredData} columns={columns} />
    </div>
  );
};

export default MembersTable;
