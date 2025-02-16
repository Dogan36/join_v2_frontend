import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

const FeatureList = [
  {
    title: 'Effortless Task Management',
   
    description: (
      <>
        JOIN macht das Verwalten von Aufgaben in Workspaces einfach und
        effizient. Erstelle, bearbeite und priorisiere Aufgaben mühelos.
      </>
    ),
  },
  {
    title: 'Intuitive Collaboration',

    description: (
      <>
        Arbeite mit deinem Team nahtlos zusammen. In JOIN kannst du Workspaces
        erstellen, Mitglieder einladen und gemeinsam an Projekten arbeiten.
      </>
    ),
  },
  {
    title: 'Customizable Workflows',

    description: (
      <>
        Passe dein Task-Board mit individuellen Kategorien und Workflows an. JOIN
        bietet dir die Flexibilität, die du brauchst, um effizient zu arbeiten.
      </>
    ),
  },
];

function Feature({title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
    
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
