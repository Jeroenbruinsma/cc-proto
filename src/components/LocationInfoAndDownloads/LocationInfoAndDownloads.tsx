import { FunctionComponent } from "react";
import LocationInfoSection from "./LocationInfoSection";
import DownloadsSection from "./DownloadsSection";
import styles from "./LocationInfoAndDownloads.module.css";

export type LocationInfoAndDownloadsType = {
  className?: string;
};

const LocationInfoAndDownloads: FunctionComponent<
  LocationInfoAndDownloadsType
> = ({ className = "" }) => {
  return (
    <div className={[styles.locationInfoAndDownloads, className].join(" ")}>
      <header className={styles.topheader}>
        <div className={styles.homeiconv2Parent}>
          <img
            className={styles.homeiconv2}
            loading="lazy"
            alt=""
            src="/homeiconv2@2x.png"
          />
          <div className={styles.right}>
            <img
              className={styles.magnifierIcon}
              loading="lazy"
              alt=""
              src="/magnifier.svg"
            />
            <img
              className={styles.profileicon}
              loading="lazy"
              alt=""
              src="/profileicon.svg"
            />
          </div>
        </div>
      </header>
      <section className={styles.currentstatusheader}>
        <div className={styles.statusContent}>
          <div className={styles.statusLeft}>
            <div className={styles.mmu02Wrapper}>
              <h1 className={styles.mmu02}>Dummy Equipment</h1>
            </div>
          </div>
          <div className={styles.lastUpdated05006Jun202Wrapper}>
            <div className={styles.lastUpdated0500}>
              Last updated: 05:00, 6 Jun 2024
            </div>
          </div>
        </div>
        <div className={styles.subsectionHeader}>
          <div className={styles.titleplussince}>
            <b className={styles.kpiStatistics}>Current Status</b>
          </div>
          <div className={styles.lineframe}>
            <div className={styles.lineframeChild} />
          </div>
        </div>
        <div className={styles.currentinfo}>
          <div className={styles.duoindicator}>
            <div className={styles.statusindicator}>
              <img
                className={styles.indicatorbolljumboIcon}
                loading="lazy"
                alt=""
                src="/indicatorbolljumbo.svg"
              />
              <div className={styles.textframe}>
                <b className={styles.charging}>Actual-State</b>
                <div className={styles.parkedSince48}>since 48 hrs</div>
              </div>
            </div>
            <div className={styles.statusindicator1}>
              <img
                className={styles.indicatorbolljumboIcon1}
                loading="lazy"
                alt=""
                src="/indicatorbolljumbo-1.svg"
              />
              <div className={styles.textframe1}>
                <b className={styles.charging1}>Functional</b>
                <div className={styles.parkedSince481}>-</div>
              </div>
            </div>
          </div>
          <div className={styles.metadata}>
            <div className={styles.metadatainfobox}>
              <div className={styles.serialNr234324322}>
                Serial nr: 234324322
              </div>
              <div className={styles.type400e}>Type: dummy</div>
              <div className={styles.manufacturedYr2001}>
                Manufactured yr: 2001
              </div>
              <div className={styles.commissionedYr2001}>
                Commissioned yr: 2001
              </div>
              <div className={styles.slaActive}>SLA Active : Yes</div>
              <div className={styles.slActiveSince}>SL Active since: 2002</div>
              <div className={styles.dataConsentYes}>Data consent: Yes</div>
            </div>
            <div className={styles.comm}>
              <div className={styles.serialNr}>Commissioned yr:</div>
              <div className={styles.serialNumberLabel}>2002</div>
            </div>
          </div>
        </div>
      </section>
      <LocationInfoSection />
      <section className={styles.locationInfoWrapper}>
        <div className={styles.locationInfo}>
          <div className={styles.subsectionHeader1}>
            <div className={styles.titleplussince1}>
              <b className={styles.kpiStatistics1}>Equipment Location info</b>
            </div>
            <div className={styles.lineframe1}>
              <div className={styles.lineframeItem} />
            </div>
          </div>
          <div className={styles.wrapper}>
            <div className={styles.left}>
              <b className={styles.cavotecNorway}>Narvik Kaj</b>
              <a
                className={styles.serviceCenterManager}
                href="https://cavonet.cavotec.com/.profile/ingebrigtsen"
                target="_blank"
              />
              <p className={styles.gevinglia1127517Container}>
                <span className={styles.havnegata1A}>Havnegata 1 A</span>
                <span className={styles.narvik}>{`8514 Narvik, `}</span>
                <span className={styles.norway}>Norway</span>
              </p>
            </div>
            <div className={styles.right1}>
              <div className={styles.image32Wrapper}>
                <img
                  className={styles.image32Icon}
                  alt=""
                  src="/image-32-1@2x.png"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <DownloadsSection />
      <section className={styles.kpiplusheader}>
        <div className={styles.subsectionHeader2}>
          <div className={styles.titleplussince2}>
            <b className={styles.kpiStatistics2}>KPI Statistics</b>
            <div className={styles.sinceDropdown}>
              <div className={styles.dropdownIcon}>
                <img
                  className={styles.dropdownIconChild}
                  loading="lazy"
                  alt=""
                  src="/polygon-11.svg"
                />
              </div>
              <div className={styles.months}> 12 months</div>
            </div>
          </div>
          <div className={styles.lineframe2}>
            <div className={styles.lineframeInner} />
          </div>
        </div>
        <footer className={styles.kpiBox}>
          <div className={styles.metricBox}>
            <div className={styles.metricTypes} />
            <b className={styles.unitAvailability}>Dummy</b>
            <h2 className={styles.empty}>-%</h2>
          </div>
          <div className={styles.metricBox1}>
            <div className={styles.metricBoxChild} />
            <b className={styles.unitAvailability1}>Dummy</b>
            <h2 className={styles.h2}>-%</h2>
          </div>
          <div className={styles.metricBox2}>
            <div className={styles.metricBoxItem} />
            <b className={styles.unitAvailability2}>Dummy</b>
            <h2 className={styles.h21}>-%</h2>
          </div>
          <div className={styles.metricBox3}>
            <div className={styles.metricBoxInner} />
            <b className={styles.unitAvailability3}>Dummy</b>
            <h2 className={styles.h22}>-%</h2>
          </div>
          <div className={styles.metricBox4}>
            <div className={styles.rectangleDiv} />
            <b className={styles.unitAvailability4}>Dummy</b>
            <h2 className={styles.h23}>-%</h2>
          </div>
          <div className={styles.doubleArrowWrapper}>
            <div className={styles.doubleArrow}>
              <div className={styles.singleArrowright}>
                <img
                  className={styles.singleArrowrightChild}
                  loading="lazy"
                  alt=""
                  src="/vector-20.svg"
                />
                <img
                  className={styles.singleArrowrightItem}
                  loading="lazy"
                  alt=""
                  src="/vector-20.svg"
                />
              </div>
            </div>
          </div>
        </footer>
      </section>
    </div>
  );
};

export default LocationInfoAndDownloads;
