'use client';

import { useState } from 'react';
import { Avatar, Card, Button, Tag, Input } from '@rafacdomin/ds-core';
import styles from './Page.module.scss';

const skills = ['React', 'TypeScript', 'Design Systems', 'Module Federation'];

export function Page() {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState('Rafael Domingues');

  return (
    <div className={styles.container}>
      <Card className={styles.root}>
        <div className={styles.headerBadge}>
          <Tag variant="neutral" size="sm">Next.js App Router</Tag>
        </div>

        <div className={styles.profile}>
          <Avatar name={name} size="lg" />
          {editing ? (
            <div className={styles.inputWrapper}>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                aria-label="Nome do usuário"
              />
            </div>
          ) : (
            <h1>{name}</h1>
          )}
          <p className={styles.title}>Senior Frontend Engineer</p>
        </div>

        <div className={styles.skills}>
          {skills.map((skill) => (
            <Tag key={skill} variant="neutral">{skill}</Tag>
          ))}
        </div>

        <div className={styles.action}>
          <Button
            variant={editing ? 'primary' : 'secondary'}
            onClick={() => setEditing((e) => !e)}
          >
            {editing ? 'Salvar' : 'Editar perfil'}
          </Button>
        </div>
      </Card>
    </div>
  );
}
