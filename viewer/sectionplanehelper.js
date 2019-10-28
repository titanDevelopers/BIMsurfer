import * as vec3 from "./glmatrix/vec3.js";

const X = vec3.fromValues(1., 0., 0.);
const Y = vec3.fromValues(0., 1., 0.);
const Z = vec3.fromValues(0., 0., 1.);
export const X_SECTION_INDEX = 0;
export const Y_SECTION_INDEX = 1;
export const Z_SECTION_INDEX = 2;
export const FREE_SECTION_INDEX = 3;

export class SectionPlaneHelper {

    constructor() {
        this.isSectionMoving = false;
        this.sectionIndex = -1;
    }

    setModelBounds(modelBounds) {
        this.modelBounds = modelBounds;
    }

    getDefaultCoordinate(coordinate, index) {
        let maxCoordinate = Math.abs(this.modelBounds[index]);
        if (!coordinate) {
            return maxCoordinate;
        }
        return coordinate > maxCoordinate
            ? maxCoordinate
            : coordinate < -maxCoordinate
                ? -maxCoordinate
                : coordinate;
    }

    getCoordinatesSectionPlane(coordinates) {
        if (!this.isFreeSectionIndex()) {
            let coordinate = coordinates[this.sectionIndex];
            coordinates[0] = 0;
            coordinates[1] = 0;
            coordinates[2] = 0;
            coordinates[this.sectionIndex] = coordinate;
        }
        return coordinates;
    }

    getRefSectionPlane(normal) {
        if (this.sectionIndex === X_SECTION_INDEX || this.sectionIndex === Y_SECTION_INDEX) {
            return Z;
        } else if (this.sectionIndex === Z_SECTION_INDEX) {
            return X;
        } else {
            let ref = null;
            if (Math.abs(vec3.dot(normal, Z)) < 0.9) {
                ref = Z;
            } else {
                ref = X;
            }
            return ref;
        }
    }

    getScaleSectionPlane(normal) {
        let lengthX = Math.abs(this.modelBounds[X_SECTION_INDEX]);
        let lengthY = Math.abs(this.modelBounds[Y_SECTION_INDEX]);
        let lengthZ = Math.abs(this.modelBounds[Z_SECTION_INDEX]);

        if (this.sectionIndex === X_SECTION_INDEX) {
            return { U: this.calculateScale(lengthY), V: this.calculateScale(lengthZ) };
        } else if (this.sectionIndex === Y_SECTION_INDEX) {
            return { U: this.calculateScale(lengthX), V: this.calculateScale(lengthZ) };
        } else if (this.sectionIndex === Z_SECTION_INDEX) {
            return { U: this.calculateScale(lengthY), V: this.calculateScale(lengthX) };
        } else {
            const index = normal.indexOf(Math.max(...normal.map(a => Math.abs(a))));
            const scale = 0.15;
            switch (index) {
                case X_SECTION_INDEX:
                    return { U: lengthY * scale, V: lengthZ * scale };
                case Y_SECTION_INDEX:
                    return { U: lengthX * scale, V: lengthZ * scale };
                case Z_SECTION_INDEX:
                    return { U: lengthY * scale, V: lengthX * scale };
                default:
                    return { U: 500, V: 500 };
            }
        }
    }

    calculateScale(scale) {
        return scale + scale * 0.1;
    }

    getNormalSectionPlane(normal) {
        if (!this.isFreeSectionIndex()) {
            this.clearNormalSectionPlane(normal);
            normal[this.sectionIndex] = 1;
        } else if (this.isFreeSectionIndex() && this.lastNormal) {
            normal = this.lastNormal;
        }
        return normal;
    }

    clearNormalSectionPlane(normal) {
        for (let index = 0; index < normal.length; index++) {
            normal[index] = 0;
        }
    }

    saveLastNormalSectionPlane(normal) {
        if (this.isFreeSectionIndex() && !this.lastNormal) {
            this.lastNormal = normal;
        }
    }

    disableSectionPlane() {
        this.isSectionMoving = false;
        this.lastNormal = null;
    }

    isFreeSectionIndex() {
        return this.sectionIndex === FREE_SECTION_INDEX;
    }
}