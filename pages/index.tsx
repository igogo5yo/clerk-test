import React from "react";
import Head from 'next/head'
import cx from 'classnames'
import styles from '../styles/Home.module.css'
import InviteMembers from "../components/InviteMembers";
import MembersTable from "../components/MembersTable";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Clerk test</title>
        <meta name="description" content="Test assigment for clerk " />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.inviteContainer}>
        <h3 className={cx('h3', styles.heading)}>Invite members</h3>

        <InviteMembers />
      </div>

      <div>
        <h3 className={cx('h3', styles.heading2)}>Manage team members</h3>

        <MembersTable />
      </div>

    </div>
  )
}
